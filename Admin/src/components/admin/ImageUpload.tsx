import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

export function ImageUpload({
  value,
  onChange,
  label = "Image",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handle = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <div className="size-20 rounded-lg border bg-muted/40 grid place-items-center overflow-hidden shrink-0">
          {value ? (
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <Upload className="size-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={ref}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handle(e.target.files[0])}
          />
          <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()}>
            <Upload className="size-4 mr-2" /> Upload {label}
          </Button>
          {value && (
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
              <X className="size-4 mr-2" /> Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function MultiImageUpload({
  values,
  onChange,
}: {
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const handle = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => onChange([...values, String(reader.result)]);
      reader.readAsDataURL(file);
    });
  };
  return (
    <div className="space-y-3">
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && handle(e.target.files)}
      />
      <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()}>
        <Upload className="size-4 mr-2" /> Upload Images
      </Button>
      {values.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {values.map((v, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border group">
              <img src={v} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(values.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 size-6 rounded-full bg-black/60 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
