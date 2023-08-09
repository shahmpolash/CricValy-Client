import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Footer from './Shared/Footer';
import Header from './Shared/Header';
import AddAcademy from './components/Pages/Academy/AddAcademy/AddAcademy';
import AcademyDetails from './components/Pages/Academy/AcademyDetails';
import AddProfile from './components/Pages/Players/PlayerProfile/AddProfile';
import AddCategory from './components/Pages/Products/AddCategory';
import AddProducts from './components/Pages/Products/AddProducts';
import ProductDetails from './components/Pages/Products/ProductDetails';
import RequireAuth from './Shared/RequireAuth';
import AddToCart from './components/Pages/AddToCart/AddToCart';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import MyOrders from './components/Pages/MyOrders/MyOrders';
import TestCart from './components/Pages/AddToCart/TestCart';
import BuyNow from './components/Pages/BuyNow/BuyNow';
import AllOrders from './components/Pages/Admin/AllOrders';
import OrderStatus from './components/Pages/Admin/OrderStatus';
import PaymentStatus from './components/Pages/Admin/PaymentStatus';
import ProductVariation from './components/Pages/Products/ProductVariation';
import PlayerDetails from './components/Pages/Players/PlayerDetails/PlayerDetails';
import LatestMatchs from './components/Pages/Players/PlayerProfile/LatestMatchs';
import Dashboard from './components/Pages/Dashboard';
import AddToProfile from './components/Pages/Players/PlayerProfile/AddToProfile';
import AddDistricts from './components/Pages/Districts/AddDistricts';
import Districts from './components/Pages/Districts/Districts';
import AcademyList from './components/Pages/Academy/AcademyList';
import Videos from './components/Pages/Videos/Videos';
import Video from './components/Pages/Videos/Video';
import AllPlayers from './components/Pages/Players/AllPlayers';
import Training from './components/Pages/Training/Training';
import Update from './components/Pages/Update';
import UpdateTotalMatches from './components/Pages/UpdateTotalMatches';
import UpdateTotalRuns from './components/Pages/UpdateTotalRuns';
import UpdateTotalWickets from './components/Pages/UpdateTotalWickets';
import UpdateHeightRuns from './components/Pages/UpdateHeightRuns';
import UpdateHeightWkts from './components/Pages/Videos/UpdateHeightWkts';
import EditProfile from './components/Pages/EditProfile';
import JoinNow from './components/Pages/JoinNow';
import AddTrainingVideo from './components/Pages/Videos/AddTrainingVideo';
import AddInformationVideo from './components/Pages/Videos/AddInformationVideo';
import IntermediateVideos from './components/Pages/Videos/IntermediateVideos';
import BegginerVideos from './components/Pages/Videos/BegginerVideos';
import AdvanceVideo from './components/Pages/Videos/AdvanceVideo';


function App() {
  return (
    <div className='container'>
<Header></Header>
      <Routes>
        <Route path='/' element ={<Home></Home>}></Route>
        <Route path='/login' element ={<Login></Login>}></Route>
        <Route path='/register' element ={<Register></Register>}></Route>
        <Route path='/join' element ={<JoinNow></JoinNow>}></Route>

        <Route path='/add-academy' element ={<AddAcademy></AddAcademy>}></Route>
        <Route path='/add-district' element ={<AddDistricts></AddDistricts>}></Route>
        <Route path='/add-category' element ={<AddCategory></AddCategory>}></Route>
        <Route path='/add-product' element ={<AddProducts></AddProducts>}></Route>
        <Route path='/add-variation' element ={<ProductVariation></ProductVariation>}></Route>
        <Route path='/add-training-video' element ={<AddTrainingVideo></AddTrainingVideo>}></Route>
        <Route path='/add-information-video' element ={<AddInformationVideo></AddInformationVideo>}></Route>


        <Route path='/academy/:id' element ={<AcademyDetails></AcademyDetails>}></Route>
        <Route path='/academies/:id' element ={<AcademyList></AcademyList>}></Route>
        <Route path='/districts' element ={<Districts></Districts>}></Route>
        <Route path='/academy-list' element ={<Districts></Districts>}></Route>
        <Route path='/videos' element ={<Videos></Videos>}></Route>
        <Route path='/video/:id' element ={<Video></Video>}></Route>
        <Route path='/players' element ={<AllPlayers></AllPlayers>}></Route>
        <Route path='/training' element ={<Training></Training>}></Route>
        <Route path='/begginer' element ={<BegginerVideos></BegginerVideos>}></Route>
        <Route path='/intermediate' element ={<IntermediateVideos></IntermediateVideos>}></Route>
        <Route path='/advance' element ={<AdvanceVideo></AdvanceVideo>}></Route>


        <Route path='/cart' element ={<RequireAuth><AddToCart></AddToCart></RequireAuth>}></Route>
        <Route path='/buy-now/:id' element ={<RequireAuth><BuyNow></BuyNow></RequireAuth>}></Route>
        <Route path='/test' element ={<RequireAuth><TestCart></TestCart></RequireAuth>}></Route>
        <Route path='/my-orders' element ={<RequireAuth><MyOrders></MyOrders></RequireAuth>}></Route>

        
        <Route path='/product/:id' element ={<ProductDetails></ProductDetails>}></Route>

        <Route path='/admin/all-orders' element ={<AllOrders></AllOrders>}></Route>
        <Route path='/admin/order-status/:id' element ={<OrderStatus></OrderStatus>}></Route>
        <Route path='/admin/payment-status/:id' element ={<PaymentStatus></PaymentStatus>}></Route>


        <Route path='/add-profile' element ={<RequireAuth><AddProfile></AddProfile></RequireAuth>}></Route>
        <Route path='/dashboard' element ={<RequireAuth><Dashboard></Dashboard></RequireAuth>}></Route>
        <Route path='/player/:id' element ={<PlayerDetails></PlayerDetails>}></Route>
        <Route path='/last-match/:id' element ={<RequireAuth><LatestMatchs></LatestMatchs></RequireAuth>}></Route>
        <Route path='/add-to-profile/:id' element ={<RequireAuth><AddToProfile></AddToProfile></RequireAuth>}></Route>
        <Route path='/update' element ={<RequireAuth><Update></Update></RequireAuth>}></Route>
        <Route path='/edit-profile/:id' element ={<RequireAuth><EditProfile></EditProfile></RequireAuth>}></Route>
        <Route path='/total-matches/:id' element ={<RequireAuth><UpdateTotalMatches></UpdateTotalMatches></RequireAuth>}></Route>
        <Route path='/total-runs/:id' element ={<RequireAuth><UpdateTotalRuns></UpdateTotalRuns></RequireAuth>}></Route>
        <Route path='/total-wkts/:id' element ={<RequireAuth><UpdateTotalWickets></UpdateTotalWickets></RequireAuth>}></Route>
        <Route path='/height-runs/:id' element ={<RequireAuth><UpdateHeightRuns></UpdateHeightRuns></RequireAuth>}></Route>
        <Route path='/height-wkts/:id' element ={<RequireAuth><UpdateHeightWkts></UpdateHeightWkts></RequireAuth>}></Route>
      </Routes>
<Footer></Footer>
    </div>
  );
}

export default App;
