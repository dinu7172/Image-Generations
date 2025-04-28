"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import JSZip from "jszip";

export function UploadModal() {
  return (
    <Card className="border-none shadow-none">
      
      <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6">
        <CloudUploadIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
        <Button variant="outline" className="w-full" 
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = "image/*";
            input.onchange = async () => {
                if (!input.files || input.files.length === 0) return;
                
                try {
                    console.log("Selected files:", input.files);
                    const zip = new JSZip();
                    
                    // Get pre-signed URL from your backend
                    const response = await axios.get(`${BACKEND_URL}/pre-signed-url`);
                    const { url, key } = response.data;
                    
                    // Add files to zip
                    for (const file of input.files) {
                        const content = await file.arrayBuffer();
                        zip.file(file.name, content);
                    }
                    
                    // Generate zip blob
                    const zipBlob = await zip.generateAsync({type: "blob"});
                    console.log("Generated zip blob:", zipBlob);
                    console.log("Pre-signed URL:", url);
                    
                    // Upload directly with the pre-signed URL - this is key!
                    const uploadResponse = await axios.put(url, zipBlob, {
                        headers: {
                            'Content-Type': 'application/zip',
                        }
                    });
                    
                    console.log("Upload successful:", uploadResponse);
                    // Handle success - maybe update UI or notify user
                } catch (error) {
                    console.error("Upload error:", error);
                    // Handle error - show message to user
                }
            };
            input.click();
        }}>Select Files</Button>
      </CardContent>
    </Card>
  )
}

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  )
}