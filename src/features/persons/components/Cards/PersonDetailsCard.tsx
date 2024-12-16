import { toAgeText } from "@/lib/utils";
import { Person } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";

type PersonDetailsCardProps = {
  person: Person;
};

function PersonDetailsCard({ person }: PersonDetailsCardProps) {
  const navigate = useNavigate();
  return (
    <Card variant="modern">
      <CardHeader
        withEditButton
        onEdit={() => {
          navigate({ to: `/persons/${person.id}`, search: { ref: "entries" } });
        }}
      >
        <div className="bg-blue-50 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <CardTitle>{person.name}'s Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <span className="text-gray-600 font-medium">Age</span>
          <span className="text-gray-800">
            {person.dateOfBirth ? toAgeText(person.dateOfBirth) : "Unknown"}
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <span className="text-gray-600 font-medium">Weight</span>
          <span className="text-gray-800">{person.weight ? `${person.weight}kg` : "Unknown"}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default PersonDetailsCard;
