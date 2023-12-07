import Box from "../shared/Box";

export default function PayMethods({ payMethod, setPayMethod }) {
  const payMethods = [
    {
      id: "dankort",
      img: "/dankort.png",
    },
    {
      id: "visa",
      img: "/visa.png",
    },
    {
      id: "mastercard",
      img: "/mastercard.png",
    },
    {
      id: "mobilepay",
      img: "/mobilepay.png",
    },
  ];

  return (
    <>
      <h3 className="text-[16px] font-semibold mb-3">Vælg betalingmetode</h3>
      <Box className="flex gap-1.5 flex-col" padding={"p-2.5"} maxWidth={"w-max"}>
        <div className="flex items-center gap-1.5 flex-wrap">
          {payMethods.map((method) => (
            <Method
              img={method.img}
              key={method.id}
              id={method.id}
              setPayMethod={setPayMethod}
              payMethod={payMethod}
            />
          ))}
        </div>
      </Box>
    </>
  );
}

function Method({ img, id, setPayMethod, payMethod }) {
  return (
    <div
      onClick={() => setPayMethod(id)}
      className={`p-1 border-[2px] ${
        payMethod === id ? " border-slate-400 rounded-sm" : "border-white"
      }`}
    >
      <img src={img} alt={id} className="w-[80px] h-[50px]" />
    </div>
  );
}
