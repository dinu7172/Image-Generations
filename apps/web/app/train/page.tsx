import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { UploadModal } from "@/components/uploadImage"

export default function Train() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen my-10">
        <Card className="w-[350px] px-4">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
                <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Name of your Model" />
                            </div>
                            
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="type">Type</Label>
                                <Select>
                                    <SelectTrigger id="type">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="bg-white">
                                        <SelectItem value="Man">Man</SelectItem>
                                        <SelectItem value="Women">Women</SelectItem>
                                        <SelectItem value="Kids">Kids</SelectItem>
                                        <SelectItem value="Others">Others</SelectItem> 
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="age">Age</Label>
                                <Input id="age" placeholder="Age of your Model" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="ethinicity">Ethinicity</Label>
                                <Select>
                                    <SelectTrigger id="ethinicity">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="bg-white">
                                        <SelectItem value="white">White</SelectItem>
                                        <SelectItem value="black">Black</SelectItem>
                                        <SelectItem value="asian">Asian American</SelectItem>
                                        <SelectItem value="east">East Asian</SelectItem>
                                        <SelectItem value="hispanic">Hispanic</SelectItem>
                                        <SelectItem value="middle">Middle Eastern</SelectItem>
                                        <SelectItem value="south">South Asian</SelectItem>
                                        <SelectItem value="south-east">South East Asian</SelectItem>
                                        <SelectItem value="pacific">Pacific Islander</SelectItem>
                                        <SelectItem value="others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div  className="flex flex-col space-y-1.5">
                                <Label htmlFor="eye-color">Eye Color</Label>
                                <Select>
                                    <SelectTrigger id="eye-color">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="bg-white">
                                        <SelectItem value="Blue">Blue</SelectItem>
                                        <SelectItem value="Green">Green</SelectItem>
                                        <SelectItem value="Brown">Brown</SelectItem>
                                        <SelectItem value="Black">Black</SelectItem>
                                        <SelectItem value="Gray">Gray</SelectItem>
                                        <SelectItem value="Red">Red</SelectItem>
                                        <SelectItem value="Hazel">Hazel</SelectItem>
                                        <SelectItem value="Amber">Amber</SelectItem>
                                        <SelectItem value="Others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="eye-color">Hair Color</Label>
                                <Select>
                                    <SelectTrigger id="hair-color">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="bg-white">
                                        <SelectItem value="Blonde">Blonde</SelectItem>
                                        <SelectItem value="Green">Green</SelectItem>
                                        <SelectItem value="Brown">Brown</SelectItem>
                                        <SelectItem value="Black">Black</SelectItem>
                                        <SelectItem value="Gray">Gray</SelectItem>
                                        <SelectItem value="Red">Red</SelectItem>
                                        <SelectItem value="Hazel">Hazel</SelectItem>
                                        <SelectItem value="Amber">Amber</SelectItem>
                                        <SelectItem value="Others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Bald</Label>
                            <Switch />
                        </div>
                            <UploadModal/>
                        </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-black text-white hover:bg-gray-800">Create Model</Button>
                </CardFooter>
            </Card>
        </div>
    );
}