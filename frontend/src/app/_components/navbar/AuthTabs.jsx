import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoginForm from '@/app/_components/forms/auth/LoginForm';
import SignupForm from '@/app/_components/forms/auth/SignupForm';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

const AuthTabs = () => {
  return (
    <Dialog>
      <DialogTrigger>Guest</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Authentication</DialogTitle>
          <DialogDescription>Welcome to WordMentor</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-[400px]">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">SignUp</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="login">
            <LoginForm  />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthTabs;
