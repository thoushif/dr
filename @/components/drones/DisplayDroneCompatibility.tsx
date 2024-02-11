import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { GiSteampunkGoggles } from "react-icons/gi";
import { GrSystem } from "react-icons/gr";
import { FaMobileAlt } from "react-icons/fa";
interface CompatibilityProps {
  compatibility: Compatibility;
}

const DisplayDroneCompatibility: React.FC<CompatibilityProps> = ({
  compatibility,
}) => {
  return (
    <div className="flex flex-row justify-between space-x-4 w-full">
      <DisplayDroneCompatibilityOS
        supported_oss={compatibility.supported_oss}
      />
      <DisplayDroneCompatibilityVR vr_headsets={compatibility.vr_headsets} />
      <DisplayDroneCompatibilityMobile
        mobile_devices={compatibility.mobile_devices}
      />
    </div>
  );
};

export const DisplayDroneCompatibilityOS = ({
  supported_oss,
}: {
  supported_oss: string[];
}) => {
  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardDescription>
          <GrSystem
            className="mr-2"
            style={{ display: "inline", fontSize: "15px" }}
          />
          Operating Systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6">
          {supported_oss.map((os, index) => (
            <li key={index}>{os}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
export const DisplayDroneCompatibilityMobile = ({
  mobile_devices,
}: {
  mobile_devices: string[];
}) => {
  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardDescription>
          <FaMobileAlt
            className="mr-2"
            style={{ display: "inline", fontSize: "15px" }}
          />
          Mobile Devices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6">
          {mobile_devices.map((device, index) => (
            <li key={index}>{device}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export const DisplayDroneCompatibilityVR = ({
  vr_headsets,
}: {
  vr_headsets: VRHeadset[];
}) => {
  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardDescription>
          <GiSteampunkGoggles
            className="mr-2"
            style={{ display: "inline", fontSize: "25px" }}
          />
          VR Headsets
        </CardDescription>
      </CardHeader>
      <CardContent>
        {vr_headsets.map((headset, index) => (
          <div key={index}>
            <h4 className="text-md font-medium">{headset.brand}</h4>
            <ul className="list-disc pl-6">
              {headset.versions.map((version, idx) => (
                <li key={idx}>{version}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DisplayDroneCompatibility;
