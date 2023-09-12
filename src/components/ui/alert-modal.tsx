import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";
import { Title } from "@radix-ui/react-alert-dialog";
import { Input } from "./input";

interface AlertModalProps {
  title: string;
  button: string;
  children?: React.ReactNode;
}

const AlertModal: FC<AlertModalProps> = ({ title, button, children }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>{button}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2 mt-4">
          <AlertDialogAction>Exit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
