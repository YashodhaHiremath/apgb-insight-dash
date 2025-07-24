import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building2, Lock, User } from "lucide-react";

const Login = () => {
  const [bank, setBank] = useState("");
  const [loginAs, setLoginAs] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bank || !loginAs || !userId || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Mock authentication
    if (userId === "admin" && password === "admin123") {
      localStorage.setItem("userId", userId);
      localStorage.setItem("loginAs", loginAs);
      navigate("/dashboard");
      toast({
        title: "Login Successful",
        description: `Welcome ${userId}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const handleForgotPassword = () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Please enter your User ID first",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Reset",
      description: "Password reset link sent to your registered email",
    });
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-banking-light-blue via-background to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4">
            <Building2 className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">APGB FI</h1>
          <p className="text-muted-foreground">Banking Dashboard Portal</p>
        </div>

        <Card className="shadow-strong border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bank">Select Bank</Label>
                <Select value={bank} onValueChange={setBank}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="APGB">APGB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loginAs">Login As</Label>
                <Select value={loginAs} onValueChange={setLoginAs}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="userId"
                    type="text"
                    placeholder="Enter your user ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-banking-blue hover:opacity-90 transition-opacity">
                Login
              </Button>
            </form>

            <div className="text-center space-y-2">
              <Button
                variant="link"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Button>
              
              {showForgotPassword && (
                <div className="space-y-2 p-4 bg-accent rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Enter your User ID to reset password
                  </p>
                  <Button onClick={handleForgotPassword} size="sm" variant="outline">
                    Send Reset Link
                  </Button>
                </div>
              )}
            </div>

            <div className="text-center text-xs text-muted-foreground mt-6">
              <p>Demo Credentials:</p>
              <p className="font-mono">User ID: admin | Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;