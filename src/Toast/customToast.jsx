import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";

// Show logout toast
export const showLogoutToast = () => {
  toast.custom(
    (t) => (
      <div
        className={`relative ${
          t.visible ? "animate-custom-enter" : "animate-custom-leave"
        } max-w-sm w-full bg-bajrang-bg shadow-xl rounded-2xl pointer-events-auto flex flex-col gap-2 ring-1 ring-black/10 border border-bajrang-accent/40 p-4`}
      >
        {/* Header row: Message + Close */}
        <div className="flex items-start justify-between w-full">
          <span className="text-2xl font-bold text-bajrang-accent animate-bounce">
            👋 Bye Bye!
          </span>

          {/* Close Button (inline row, catchy hover) */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="p-1 ml-2 transition-all rounded-full text-bajrang-text hover:text-bajrang-brand hover:bg-bajrang-bg/70"
          >
            ✖️
          </button>
        </div>

        {/* Subtext */}
        <p className="text-sm text-center text-bajrang-text">
          Hope to see you again soon. Have an awesome day! 🚀
        </p>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-bajrang-accent animate-toast-progress rounded-bl-2xl rounded-br-2xl" />
      </div>
    ),
    {
      position: "top-right",
      duration: 4000,
    }
  );
};

// Toast rendering function
export const showUserToast = (user) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-custom-enter" : "animate-custom-leave"
        } max-w-sm w-full bg-bajrang-bg shadow-xl rounded-2xl pointer-events-auto flex ring-1 ring-black/10 border border-bajrang-accent/40`}
      >
        {/* Left Section - Avatar */}

        <div className="flex items-center flex-1 w-0 p-4">
          <div className="flex-shrink-0 w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-bajrang-accent shadow-md">
            <Avatar className="w-full h-full">
              <AvatarImage
                src={user?.profileImage}
                alt="profile"
                className="object-cover w-full h-full"
              />
              <AvatarFallback className="text-lg font-bold bg-bajrang-bg text-bajrang-brand">
                {user?.fullName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Info */}
          <div className="flex flex-col ml-3">
            <p className="text-sm font-semibold text-bajrang-brand">
              {user?.fullName || "User"}
            </p>
            <p className="mt-1 text-sm text-bajrang-text">
              🎉 Welcome back,{" "}
              <span className="font-medium">{user?.fullName || "User"}</span>!
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex items-center pr-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="p-1 transition-colors duration-200 rounded-full text-bajrang-text hover:text-bajrang-brand hover:bg-bajrang-bg/60"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-bajrang-accent animate-toast-progress rounded-bl-2xl rounded-br-2xl" />
      </div>
    ),
    {
      position: "top-right",
      duration: 4000,
    }
  );
};
