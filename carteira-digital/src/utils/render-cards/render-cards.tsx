import CardLayout from "@/components/cards/card-expenses-earnings/card-expenses-earnings";
import CardInvestiment from "@/components/cards/card-investment/card-investiment";

export default function RenderForms() {
  return (
    <>
      <div>
        <CardLayout
          title="seus Gastos"
          typeComponent="spending"
          placeholderInputValue="Valor de seu gasto"
          placeholderInputDescrioption="com que foi seu gasto?"
        />
      </div>
      <div>
        <CardLayout
          title="Seus ganhos"
          typeComponent="earnings"
          placeholderInputValue="Valor de seu ganho?"
          placeholderInputDescrioption="Com que foi seu ganho?"
        />
      </div>
      <div>
        <CardInvestiment title="Seus investimentos" />
      </div>
    </>
  );
}
