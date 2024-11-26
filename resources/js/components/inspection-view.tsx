import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

type Props = {
    children: JSX.Element;
};

function InspectionView({ children }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="min-w-[80%]">
                <DialogHeader>
                    <DialogTitle>Inspection Report</DialogTitle>
                    <DialogDescription>
                        This page shows all the components that have been scheduled to be inspected
                        or have had their inspection already.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Site Details</CardTitle>
                            </CardHeader>
                            <CardContent>Content</CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Equipment Details</CardTitle>
                            </CardHeader>
                            <CardContent>Content</CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Inspection Details</CardTitle>
                        </CardHeader>
                        <CardContent>Content</CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Inspected Components</CardTitle>
                    </CardHeader>
                    <CardContent>Content</CardContent>
                </Card>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default InspectionView;
