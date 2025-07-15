import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Shield, Zap, Lock, Users, Code, ExternalLink, Star, User, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import LogoutButton from "./auth/logout-button"

export default async function LandingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  
  // Helper function to get user initials
  const getUserInitials = (name: string | undefined, email: string | undefined) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="font-bold text-xl">Better Auth</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="#features" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Features
              </Link>
              <Link href="#demo" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Demo
              </Link>
              <Link href="#docs" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Docs
              </Link>
              <Link href="#github" className="transition-colors hover:text-foreground/80 text-foreground/60">
                GitHub
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {user ? (
              // Authenticated user - show profile dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || undefined} alt={user.name || user.email || "User"} />
                      <AvatarFallback>
                        {getUserInitials(user.name, user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
<LogoutButton/>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Unauthenticated user - show sign in/up buttons
              <>
<Link href="/login">
                <Button variant="ghost" size="sm" >
                  Sign In
                </Button>
</Link>
<Link href="/signup">
                <Button size="sm">Sign Up</Button>
</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4">
                  <Zap className="w-3 h-3 mr-1" />
                  Better Authentication Made Simple
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {user ? (
                    <>
                      Welcome back,
                      <br />
                      <span className="text-primary">{user.name || user.email?.split('@')[0] || 'User'}</span>
                    </>
                  ) : (
                    <>
                      Secure Authentication
                      <br />
                      <span className="text-primary">Built Better</span>
                    </>
                  )}
                </h1>
                <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl">
                  {user ? (
                    "You're successfully authenticated with Better Auth. Explore our features and see how easy secure authentication can be."
                  ) : (
                    "A modern, secure, and developer-friendly authentication solution. Easy to integrate, impossible to compromise."
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="h-12 px-8">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {user ? "Dashboard" : "Try Demo"}
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Better Auth?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Built with modern security practices and developer experience in mind
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary" />
                  <CardTitle>Enterprise Security</CardTitle>
                  <CardDescription>
                    Built-in protection against common vulnerabilities with industry-standard encryption
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Code className="h-10 w-10 text-primary" />
                  <CardTitle>Developer Friendly</CardTitle>
                  <CardDescription>
                    Simple API, comprehensive documentation, and TypeScript support out of the box
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary" />
                  <CardTitle>Lightning Fast</CardTitle>
                  <CardDescription>
                    Optimized for performance with minimal bundle size and fast authentication flows
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px] 2xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    {user ? "You're Authenticated!" : "See It In Action"}
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {user ? (
                      "Your session is active and secure. Better Auth is protecting your account with enterprise-grade security features."
                    ) : (
                      "Experience Better Auth with our interactive demo. Test all features including social logins, multi-factor authentication, and session management."
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {user ? "Dashboard" : "Launch Demo"}
                  </Button>
                  <Button variant="outline" size="lg">
                    View Documentation
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full max-w-sm">
                  <CardHeader>
                    <CardTitle className="text-center">
                      {user ? "Session Active" : "Demo Login"}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {user ? "You are successfully authenticated" : "Try our authentication system"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {user ? (
                      // Show authenticated user info
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.image || undefined} alt={user.name || user.email || "User"} />
                            <AvatarFallback>
                              {getUserInitials(user.name, user.email)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name || "User"}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <Badge variant="secondary" className="text-green-600">
                            <Shield className="w-3 h-3 mr-1" />
                            Authenticated
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      // Show demo login form
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <div className="h-10 rounded-md border bg-muted/50 flex items-center px-3">
                            <span className="text-muted-foreground text-sm">demo@example.com</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Password</label>
                          <div className="h-10 rounded-md border bg-muted/50 flex items-center px-3">
                            <span className="text-muted-foreground text-sm">••••••••</span>
                          </div>
                        </div>
                        <Button className="w-full" disabled>
                          <Lock className="mr-2 h-4 w-4" />
                          Sign In (Demo)
                        </Button>
                        <div className="text-center">
                          <Button variant="link" size="sm" disabled>
                            Continue with Google
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Section */}
        <section id="github" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Github className="h-12 w-12 mx-auto text-primary" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Open Source & Ready to Use</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Clone the repository, follow our setup guide, and have authentication running in your app within
                  minutes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="h-12 px-8">
                  <Github className="mr-2 h-4 w-4" />
                  Clone Repository
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent">
                  <Star className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Button>
              </div>
           </div>
          </div>
        </section>

        {/* CTA Section */}
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 Better Auth. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Documentation
          </Link>
        </nav>
      </footer>
    </div>
  )
}
