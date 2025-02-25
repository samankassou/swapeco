import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Link } from '@inertiajs/react'  // Import Inertia Link for SPA navigation

export function LoginForm({
  data,
  setData,
  errors,
  processing,
  onSubmit,
  canResetPassword,
  className,
  ...props
}: {
  data: { email: string; password: string; remember: boolean };
  setData: (field: string, value: string | boolean) => void;
  errors: any;
  processing: boolean;
  onSubmit: React.FormEventHandler;
  canResetPassword: boolean;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="swapeco@prod.dev"
                  value={data.email}
                  required
                  onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {canResetPassword && (
                    <Link
                      href={route('password.request')}
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  required
                  onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <div className="flex items-center">
                <Button type="submit" className="w-full" disabled={processing}>
                  Login
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href={route('register')}
              className="underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



