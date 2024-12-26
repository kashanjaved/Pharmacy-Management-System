import Navbar from "./components/Navbar"
import { Routes , Route } from "react-router-dom"
import Wholesale from "./components/Pages/Wholesale"
import OnlinePayments from "./components/Pages/OnlinePayments"
import Expenses from "./components/Pages/Expenses"
import ClosingCash from "./components/Pages/ClosingCash"
import InOutCash from "./components/Pages/InOutCash"
import PurchasesTax from "./components/Pages/PurchasesTax"
import PurchasesNonTax from "./components/Pages/PurchasesNonTax"

function App() {

  return (
    <>
    <Navbar />
    <Routes>  
    <Route path= "/wholesale"  element= { <Wholesale/> } />  
    <Route path="/tax" element= { <PurchasesTax/> } />
    <Route path="/non-tax" element={ <PurchasesNonTax/> } />
    <Route path= "/onlinepayments"  element= { <OnlinePayments/> } />  
    <Route path= "/expenses"  element= { <Expenses/> } />  
    <Route path= "/closingcash"  element= { <ClosingCash/> } />  
    <Route path= "/inoutcash"  element= { <InOutCash/> } />  
    </Routes>
    </>
  )
}

export default App

