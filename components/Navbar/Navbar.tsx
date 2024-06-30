import { FunctionComponent } from "react";
import translate from "@/public/translate.png"

interface NavbarProps {

}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <>
      <nav className="p-4 rounded-lg absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={translate.src} style={{objectFit: "cover", width: "40px", height: "40px"}} alt="Translate Icon" />
          </div>
          <div className="flex items-center">
            <div>

            </div>
            {/* User Profile */}
          </div>
        </div>

      </nav>

    </>
  );
}

export default Navbar;