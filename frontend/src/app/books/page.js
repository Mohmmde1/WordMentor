import { Payment, columns } from "./Columns"
import { DataTable } from "./DataTable"

async function getData() {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52g",
        amount: 200,
        status: "paid",
        email: "paid@gmail.com",
      },
      {
        id: "728ed52h",
        amount: 300,
        status: "failed",
        email: "mohammed@gmail.com",
      },
      {
        id: "728ed52i",
        amount: 150,
        status: "pending",
        email: "user1@example.com",
      },
      {
        id: "728ed52j",
        amount: 250,
        status: "paid",
        email: "user2@gmail.com",
      },
      {
        id: "728ed52k",
        amount: 350,
        status: "failed",
        email: "user3@gmail.com",
      },
      {
        id: "728ed52l",
        amount: 120,
        status: "pending",
        email: "user4@example.com",
      },
      {
        id: "728ed52m",
        amount: 220,
        status: "paid",
        email: "user5@gmail.com",
      },
      {
        id: "728ed52n",
        amount: 320,
        status: "failed",
        email: "user6@gmail.com",
      },
      {
        id: "728ed52o",
        amount: 110,
        status: "pending",
        email: "user7@example.com",
      },
      {
        id: "728ed52p",
        amount: 210,
        status: "paid",
        email: "user8@gmail.com",
      },
      {
        id: "728ed52q",
        amount: 310,
        status: "failed",
        email: "user9@gmail.com",
      },
      {
        id: "728ed52r",
        amount: 130,
        status: "pending",
        email: "user10@example.com",
      },
      {
        id: "728ed52s",
        amount: 230,
        status: "paid",
        email: "user11@gmail.com",
      },
      {
        id: "728ed52t",
        amount: 330,
        status: "failed",
        email: "user12@gmail.com",
      },
      {
        id: "728ed52u",
        amount: 140,
        status: "pending",
        email: "user13@example.com",
      },
      {
        id: "728ed52v",
        amount: 240,
        status: "paid",
        email: "user14@gmail.com",
      },
      {
        id: "728ed52w",
        amount: 340,
        status: "failed",
        email: "user15@gmail.com",
      },
      {
        id: "728ed52x",
        amount: 160,
        status: "pending",
        email: "user16@example.com",
      },
      {
        id: "728ed52y",
        amount: 260,
        status: "paid",
        email: "user17@gmail.com",
      }
    ];
  }
  

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
