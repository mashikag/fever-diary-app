import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { entrySchema } from "./schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PersonCombobox from "@/features/persons/components/PersonCombobox";
import { DateTimePicker, TimePicker } from "@/components/ui/date-time-picker";
import { Switch } from "@/components/ui/switch";
import { useMemo, useState } from "react";
import medications from "@/features/fever-diary/utils/medications";

export type EntryFormValues = z.infer<typeof entrySchema>;

export type EntryFormProps = {
  defaultValues?: Partial<EntryFormValues>;
  onSubmit: (values: EntryFormValues) => Promise<void>;
};

const mergeDefaults = (overrides: Partial<EntryFormValues> = {}): EntryFormValues => ({
  date: new Date(),
  personId: "",
  ...overrides,
});

function EntryForm({ defaultValues, onSubmit }: EntryFormProps) {
  const defaults = useMemo(() => mergeDefaults(defaultValues), [defaultValues]);
  const [showTemperature, setShowTemperature] = useState(!!defaults.temperature);
  const [showMedication, setShowMedication] = useState(!!defaults.medication);

  const form = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: defaults,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded-md p-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            const handleDateTimeChange = (date?: Date) => {
              if (!date) return;
              form.setValue("date", date);
            };

            return (
              <FormItem className="grid grid-cols-2 gap-x-8 justify-start">
                <FormLabel className="text-left">Date</FormLabel>
                <FormLabel className="text-left">Time</FormLabel>
                <FormControl className="text-left">
                  <DateTimePicker
                    value={field.value}
                    onChange={handleDateTimeChange}
                    granularity="day"
                  />
                </FormControl>
                <FormControl className="justify-start">
                  <TimePicker
                    date={field.value}
                    onChange={handleDateTimeChange}
                    hourCycle={24}
                    granularity="minute"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="personId"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Person Name</FormLabel>
                <FormControl>
                  <PersonCombobox value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex items-center space-x-2">
          <Switch
            id="temperature-switch"
            checked={showTemperature}
            onCheckedChange={(checked) => {
              setShowTemperature(checked);
              if (!checked) {
                form.setValue("temperature", undefined);
              }
            }}
          />
          <label
            htmlFor="temperature-switch"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Record body temperature
          </label>
        </div>

        <div
          className={`transform transition-all duration-200 ease-in-out ${
            showTemperature ? "opacity-100 max-h-24" : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature (°C)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="37.5"
                    step="0.1"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="medication-switch"
            checked={showMedication}
            onCheckedChange={(checked) => {
              setShowMedication(checked);
              if (!checked) {
                form.setValue("medication", undefined);
              }
            }}
          />
          <label
            htmlFor="medication-switch"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Record medication
          </label>
        </div>

        <div
          className={`transform transition-all duration-200 ease-in-out space-y-8 ${
            showMedication ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <FormField
            control={form.control}
            name="medication.type"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Medication Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select medication type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(medications).map(([type, { label }]) => (
                        <SelectItem key={type} value={type}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="medication.form.type"
            render={({ field }) => {
              const medType = form.getValues("medication.type");
              const medForms = medType ? medications[medType].forms : [];

              return (
                <FormItem>
                  <FormLabel>Medication Form</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!medType}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select medication form" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {medForms.map(({ form, label }) => (
                        <SelectItem key={form} value={form}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="medication.form.strength"
            render={({ field }) => {
              const medType = form.watch("medication")?.type;
              const medFormType = form.watch("medication.form.type");

              const disabled = !medType || !medFormType;
              const medFormVariants =
                !disabled && medications[medType].forms.find((f) => f.form === medFormType);

              return (
                <FormItem>
                  <FormLabel>Medication Strength</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value === undefined ? "" : String(field.value)}
                    disabled={disabled}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select medication strength" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {medFormVariants &&
                        medFormVariants.variants.map(({ strength, label }) => (
                          <SelectItem key={strength} value={String(strength)}>
                            {label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="medication.form.dose"
            render={({ field }) => {
              const medType = form.getValues("medication.type");
              const medFormType = form.watch("medication.form.type");
              const medFormStrength = form.watch("medication.form.strength");

              const disabled = !medType || !medFormType || !medFormStrength;

              const medForm =
                !disabled && medications[medType].forms.find((f) => f.form === medFormType);
              const doseUnit = medForm?.doseUnit ? `(${medForm.doseUnit})` : "";

              return (
                <FormItem>
                  <FormLabel disabled={disabled}>Medication Dosage {doseUnit}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      disabled={disabled}
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <Button type="submit">Save Entry</Button>
      </form>
    </Form>
  );
}

export default EntryForm;
