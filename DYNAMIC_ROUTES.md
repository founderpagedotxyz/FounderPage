# Sistema de Rutas Dinámicas - Indie Page

## 📋 Resumen

Este proyecto implementa un sistema de rutas dinámicas para páginas públicas de usuario, similar a Linktree e IndiePages.

Cada usuario tiene su propia página pública accesible en:
```
tudominio.com/username
```

## 🏗️ Arquitectura

### Stack Tecnológico
- **Frontend**: React + Vite + TypeScript
- **Routing**: React Router DOM v6
- **Backend**: Supabase (via Lovable Cloud)
- **SEO**: React Helmet Async
- **Validación**: Zod

**Nota importante**: Este NO es un proyecto Next.js. Usa React con Client-Side Routing.

## 🛣️ Sistema de Rutas

### Configuración Principal (`src/App.tsx`)

```tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/auth" element={<Auth />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/new-startup" element={<NewStartup />} />
  
  {/* Ruta dinámica - DEBE estar antes del catch-all */}
  <Route path="/:username" element={<Profile />} />
  
  {/* Catch-all 404 */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

**Orden crítico**: La ruta `/:username` debe estar ANTES del catch-all `*` para funcionar correctamente.

## 💾 Base de Datos

### Tabla `profiles` (Supabase)

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,  -- Campo clave para rutas
  name TEXT,
  email TEXT,
  bio TEXT,
  photo_url TEXT,
  location TEXT,
  links JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice único para búsquedas rápidas
CREATE UNIQUE INDEX idx_profiles_username ON public.profiles(username);
```

### Tabla `startups`

```sql
CREATE TABLE public.startups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT,
  category TEXT,
  logo_url TEXT,
  monthly_income INTEGER DEFAULT 0,
  show_income BOOLEAN DEFAULT TRUE,
  income_verified BOOLEAN DEFAULT FALSE,
  verification_source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 📄 Componente de Página Pública

### `src/pages/Profile.tsx`

```tsx
const Profile = () => {
  const { username } = useParams();
  
  // 1. Extraer username de la URL
  const cleanUsername = username?.toLowerCase().trim();
  
  // 2. Verificar si es una ruta reservada
  if (RESERVED_USERNAMES.includes(cleanUsername)) {
    return <NotFound />;
  }
  
  // 3. Buscar usuario en la base de datos
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", cleanUsername)
    .maybeSingle();
  
  // 4. Manejar usuario no encontrado
  if (!profile) {
    return <NotFound />;
  }
  
  // 5. Renderizar página pública
  return (
    <>
      <Helmet>{/* SEO dinámico */}</Helmet>
      <ProfileContent profile={profile} />
    </>
  );
};
```

## 🔒 Validación de Username

### Archivo: `src/lib/validation.ts`

```typescript
// Usernames reservados (no se pueden usar)
export const RESERVED_USERNAMES = [
  "admin", "dashboard", "api", "settings", "login", 
  "register", "auth", "profile", "new-startup", 
  // ... más nombres reservados
];

// Schema de validación
export const usernameSchema = z
  .string()
  .trim()
  .min(3, "Mínimo 3 caracteres")
  .max(30, "Máximo 30 caracteres")
  .regex(/^[a-z0-9_-]+$/, "Solo letras minúsculas, números, guiones y guiones bajos")
  .refine(
    (username) => !RESERVED_USERNAMES.includes(username.toLowerCase()),
    "Este username está reservado"
  );
```

### Requisitos del Username
- ✅ Mínimo 3 caracteres
- ✅ Máximo 30 caracteres
- ✅ Solo minúsculas, números, `-` y `_`
- ✅ Único en toda la base de datos
- ❌ No puede ser un nombre reservado

## 🎨 Dashboard - Edición de Username

En el Dashboard (`src/pages/Dashboard.tsx`), los usuarios pueden editar su username:

```tsx
const handleUpdateProfile = async () => {
  // 1. Validar formato
  usernameSchema.parse(username);
  
  // 2. Verificar que no esté reservado
  if (RESERVED_USERNAMES.includes(username)) {
    toast.error("Username reservado");
    return;
  }
  
  // 3. Verificar que no esté en uso
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();
  
  if (existing && existing.id !== currentUserId) {
    toast.error("Username ya está en uso");
    return;
  }
  
  // 4. Actualizar
  await supabase
    .from("profiles")
    .update({ username: username.toLowerCase() })
    .eq("id", currentUserId);
};
```

## 🔍 SEO Dinámico

### Componente SEO (`src/components/SEO.tsx`)

Cada página pública genera metadatos dinámicos:

```tsx
<Helmet>
  <title>{user.name} - Indie Page</title>
  <meta name="description" content={user.bio} />
  
  {/* Open Graph */}
  <meta property="og:title" content={user.name} />
  <meta property="og:description" content={user.bio} />
  <meta property="og:image" content={user.photo_url} />
  <meta property="og:type" content="profile" />
  
  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={user.name} />
  <meta name="twitter:image" content={user.photo_url} />
  
  {/* Canonical URL */}
  <link rel="canonical" href={`${origin}/${username}`} />
</Helmet>
```

## 🚀 Flujo de Creación de Perfil Público

1. **Usuario se registra** → Trigger automático crea entrada en `profiles`
2. **Usuario elige username** → Validación + guardado en DB
3. **Página pública disponible** → Inmediatamente en `tudominio.com/username`
4. **Usuario agrega startups** → Aparecen en su página pública
5. **Usuarios externos visitan** → Ven el perfil sin necesidad de login

## 🛡️ Seguridad

### Row Level Security (RLS)

```sql
-- Los perfiles son públicos (lectura)
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

-- Solo el dueño puede actualizar su perfil
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Los startups son públicos (lectura)
CREATE POLICY "Startups are viewable by everyone"
ON public.startups FOR SELECT
USING (true);

-- Solo el dueño puede crear/editar sus startups
CREATE POLICY "Users can manage own startups"
ON public.startups FOR ALL
USING (auth.uid() = user_id);
```

## 📱 Características de la Página Pública

Cada perfil público muestra:

- ✅ Foto de perfil (circular)
- ✅ Nombre y username
- ✅ Bio del usuario
- ✅ Ubicación
- ✅ Lista de startups con:
  - Logo del startup
  - Nombre y descripción
  - Enlace al sitio web
  - Ingreso mensual (si es público)
  - Badge de "verificado" (si aplica)
  - Gráfico de crecimiento de ingresos
- ✅ CTA para que visitantes creen su propia página
- ✅ SEO optimizado para compartir en redes sociales

## 🔄 Actualización en Tiempo Real

Cuando un usuario actualiza su perfil o startups:
1. Los cambios se guardan en Supabase
2. La página pública se actualiza automáticamente
3. No requiere rebuild ni deploy

## 📊 Ejemplo de URLs

```
https://indiepage.com/marclou      → Perfil de @marclou
https://indiepage.com/jasonleow    → Perfil de @jasonleow
https://indiepage.com/pieter       → Perfil de @pieter

https://indiepage.com/admin        → 404 (reservado)
https://indiepage.com/dashboard    → 404 (reservado)
https://indiepage.com/api          → 404 (reservado)
```

## 🧪 Testing

Para probar el sistema:

1. Regístrate en `/auth`
2. Ve a `/dashboard`
3. Edita tu username (ejemplo: `johndoe`)
4. Haz clic en "View Public Page"
5. Tu página estará en `/johndoe`
6. Comparte ese link con cualquiera

## 🎯 Comparación con Competidores

| Feature | Indie Page | Linktree | IndiePages |
|---------|-----------|----------|------------|
| Ruta limpia (`/username`) | ✅ | ✅ | ✅ |
| Startups múltiples | ✅ | ❌ | ✅ |
| Ingresos verificados | ✅ | ❌ | ✅ |
| Gráficos de revenue | ✅ | ❌ | ❌ |
| Logo personalizado por startup | ✅ | ❌ | ✅ |
| SEO dinámico | ✅ | ✅ | ✅ |

## 🐛 Troubleshooting

### Problema: "Usuario no encontrado"
- Verifica que el username existe en la tabla `profiles`
- Confirma que no hay espacios ni mayúsculas
- Revisa que la ruta `/:username` esté antes del catch-all

### Problema: "Username ya en uso"
- Los usernames deben ser únicos
- La validación previene duplicados
- Constraint único en la base de datos

### Problema: "Ruta no funciona"
- Verifica el orden de las rutas en App.tsx
- `/:username` debe estar ANTES de `*`
- Limpia la caché del navegador

## 📚 Referencias

- **React Router**: https://reactrouter.com/
- **Supabase RLS**: https://supabase.com/docs/guides/auth/row-level-security
- **Zod Validation**: https://zod.dev/
- **React Helmet Async**: https://github.com/staylor/react-helmet-async
