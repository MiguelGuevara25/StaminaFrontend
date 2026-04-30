import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Title from "@/shared/Title";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const getInitials = () => {
    if (!user) return "";
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatRole = (role: string) => {
    return role.replace("ROLE_", "");
  };

  if (!user) return null;

  return (
    <section className="p-6 space-y-6">
      <Title title="Mi perfil" subtitle="Información de tu cuenta"  />

      {/* Información */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-lime-100 text-lime-800 flex items-center justify-center text-lg font-medium shrink-0">
              {getInitials()}
            </div>
            <div>
              <p className="text-base font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Separator />

          <div className="pt-4 space-y-0">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Nombre</span>
              <span className="text-sm">{user.firstName}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Apellido</span>
              <span className="text-sm">{user.lastName}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-muted-foreground">Roles</span>
              <div className="flex gap-2">
                {user.roles.map((role) => (
                  <span
                    key={role}
                    className="bg-lime-100 text-lime-800 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {formatRole(role)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seguridad */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Seguridad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Contraseña</p>
              <p className="text-xs text-muted-foreground">
                Cambia tu contraseña de acceso
              </p>
            </div>
            <Button variant="outline" size="sm" disabled>
              Cambiar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sesión */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Cerrar sesión</p>
              <p className="text-xs text-muted-foreground">
                Salir de tu cuenta en este dispositivo
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-300 hover:bg-red-500 hover:text-white cursor-pointer"
              onClick={handleLogout}
            >
              Salir
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Profile;
