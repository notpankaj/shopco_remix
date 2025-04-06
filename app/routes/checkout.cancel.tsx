import { useNavigate } from "@remix-run/react";
const Index = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[100vh] gap-[50px] flex-col">
      <h4 className="heading">Payment Cancel</h4>
      <button
        onClick={onBack}
        className="bg-black text-2xl text-white px-[40px] py-[10px] rounded-md"
      >
        BACK
      </button>
    </div>
  );
};

export default Index;
