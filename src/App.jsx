import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ClientGallery from './pages/ClientGallery';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Export from './pages/Export';
import FlowFarm from './pages/FlowFarm';
import FlowFarmForest from './pages/FlowFarmForest';
import FlowFarmGallery from './pages/FlowFarmGallery';
import FlowFarmHome from './pages/FlowFarmHome';
import FlowFarmLanding from './pages/FlowFarmLanding';
import FlowFarmLanding2 from './pages/FlowFarmLanding2';
import FlowFarmLanding_new from './pages/FlowFarmLanding_new';
import GHLanding from './pages/GHLanding';
import Gallery from './pages/Gallery';
import GarrenHill from './pages/GarrenHill';
import GarrenHillGallery from './pages/GarrenHillGallery';
import GarrenHillV2 from './pages/GarrenHillV2';
import Home from './pages/Home';
import Import from './pages/Import';
import Index from './pages/Index';
import MLS from './pages/MLS';
import Media from './pages/Media';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Review from './pages/Review';
import SocialPost from './pages/SocialPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/ClientGallery" element={<ClientGallery />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Editor" element={<Editor />} />
        <Route path="/Export" element={<Export />} />
        <Route path="/FlowFarm" element={<FlowFarm />} />
        <Route path="/FlowFarmForest" element={<FlowFarmForest />} />
        <Route path="/FlowFarmGallery" element={<FlowFarmGallery />} />
        <Route path="/FlowFarmHome" element={<FlowFarmHome />} />
        <Route path="/FlowFarmLanding" element={<FlowFarmLanding />} />
        <Route path="/FlowFarmLanding2" element={<FlowFarmLanding2 />} />
        <Route path="/FlowFarmLanding_new" element={<FlowFarmLanding_new />} />
        <Route path="/GHLanding" element={<GHLanding />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/GarrenHill" element={<GarrenHill />} />
        <Route path="/GarrenHillGallery" element={<GarrenHillGallery />} />
        <Route path="/GarrenHillV2" element={<GarrenHillV2 />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Import" element={<Import />} />
        <Route path="/Index" element={<Index />} />
        <Route path="/MLS" element={<MLS />} />
        <Route path="/Media" element={<Media />} />
        <Route path="/Properties" element={<Properties />} />
        <Route path="/PropertyDetail" element={<PropertyDetail />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/SocialPost" element={<SocialPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
