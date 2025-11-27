import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/Button"
import { TriangleAlert } from 'lucide-react';

interface ErrorDialogProps {
  isOpen: boolean;
  message: string | null;
  onClose: () => void;
}

export function ErrorDialog({ isOpen, message, onClose }: ErrorDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-2">
            <TriangleAlert className="h-6 w-6" />
             Terjadi Kesalahan
          </DialogTitle>
          <DialogDescription>
            Terjadi masalah saat memproses permintaan Anda.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 text-sm text-gray-700">
          {message}
        </div>
        
        <DialogFooter>
          <Button variant="destructive" onClick={onClose}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}