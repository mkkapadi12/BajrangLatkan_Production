// components/EditSaveCancel.jsx
import { Button } from "@/components/ui/Button"; // lowercase "button" (check your import path!)
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ADMINICONS } from "@/Icons/AdminIcons";

const EditSaveCancel = ({ isEditing, setIsEditing, handleSave }) => {
  return (
    <>
      {!isEditing ? (
        <div className="absolute top-2 right-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="!p-2 hover:bg-bajrang-accent"
                onClick={() => setIsEditing(true)}
              >
                <ADMINICONS.EDIT />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-bajrang-accent">Edit</TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <div className="absolute flex gap-2 top-2 right-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="!p-2 hover:!bg-green-500"
                onClick={handleSave}
              >
                <ADMINICONS.SAVE />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-green-500">Save</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="!p-2 hover:!bg-red-500"
                onClick={() => setIsEditing(false)}
              >
                <ADMINICONS.CANCEL />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-red-500">Cancel</TooltipContent>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default EditSaveCancel;
