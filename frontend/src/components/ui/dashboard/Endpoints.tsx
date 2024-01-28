import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function TabsEndpoints() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Express</TabsTrigger>
        <TabsTrigger value="password">Nextjs (also express)</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Express</CardTitle>
            <CardDescription>
              This endpoints are set in the Express.js backend starting with
              /api/v1
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>/auth/login</AlertTitle>
              <AlertDescription>
                To log in the app
              </AlertDescription>
            </Alert>
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>/auth/register</AlertTitle>
              <AlertDescription>
                To register a new user
              </AlertDescription>
            </Alert>
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>/auth/refreshToken</AlertTitle>
              <AlertDescription>
                To refresh the AToken
              </AlertDescription>
            </Alert>
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>/users/profile</AlertTitle>
              <AlertDescription>
                Get your profile
              </AlertDescription>
            </Alert>
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>/chat/messages</AlertTitle>
              <AlertDescription>
                Get all messages 
              </AlertDescription>
            </Alert>
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>/chat/messages/:email</AlertTitle>
              <AlertDescription>
                Get all messages from that user
              </AlertDescription>
            </Alert>

          </CardContent>
          <CardFooter>
          Neat ,ain&apos;t it?
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Next</CardTitle>
            <CardDescription>
                Next API endpoints used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>/api/validateToken</AlertTitle>
              <AlertDescription>
                It validates the token server side using an Express endpoint!
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
          Is used to validate the session in the server!
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
