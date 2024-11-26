import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  component: WelcomeComponent,
});

function WelcomeComponent() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <h2>Welcome to Fever Diary</h2>
      <p>You can start adding fever entries right away...</p>

      <div className="flex flex-row gap-2">
        <Button onClick={() => navigate({ to: "/entries/new" })}>
          Continue without login
        </Button>
        <Button variant={"secondary"} disabled>
          Create account
        </Button>
      </div>
    </div>
  );
}
