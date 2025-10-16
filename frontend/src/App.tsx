import React, { useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./auth/firebaseConfig";

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HStack, VStack, Text, Image, Button } from '@chakra-ui/react';
import { SideMenuCell } from './components/SideMenuCell';
import { sidebarStyles } from './shared/appStyles';
import { StudentsPage, CoachesPage, SchedulePage, EventsPage } from './pages/index';
import { StatisticsPage, DrillsPage, MetricsPage, AchievementsPage } from './pages/index';
import RedocPage from './pages/redoc'


function App() {
  const [config, setConfig] = useState<string>(''); // get prodaction url from server

 // useEffect(() => {
 //   axios.get(`${API_BASE_URL}/config`)
 //     .then((res) => setConfig(res.data.base_url))
 //     .catch((err) => console.error(err));
 // }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <Router>
      <HStack align='flex-start' p={1} spacing={1} bg='#EEEEEE'>
        <VStack w='300px' h='800px' spacing='3px' bg='gray.200' borderWidth={1} borderColor='gray.300'>
          <Text style={sidebarStyles.title} p={4} pb={8} as={Link} to="/">
            DINIVREY
          </Text>

          <Text style={sidebarStyles.group} alignSelf='start' pl={4} pb={3} >Main</Text>
          <SideMenuCell img='Students.png' title='Students' to='/api/students'/>
          <SideMenuCell img='Coach.png' title='Coaches' to='/api/coaches'/>
          <SideMenuCell img='Event.png' title='Schedule' to='/api/schedule'/>
          <SideMenuCell img='Game.png' title='Events' to='/api/events'/>
          <SideMenuCell img='Statistics.png' title='Statistics' to='/api/statistics'/>

          <Text style={sidebarStyles.group} alignSelf='start' pl={4} pt={8} pb={3} >Settings</Text>
          <SideMenuCell img='climbing.png' title='Drills' to='/api/drills'/>
          <SideMenuCell img='Test.png' title='Metrics' to='/api/metrics'/>
          <SideMenuCell img='Achievement.png' title='Achievements' to='/api/achievements'/>

          <Button size='sm' variant='outline' colorScheme='blue' my='100px'
            onClick={logout}>Logout</Button>
        </VStack>
        <Routes>
          <Route path="/" element={
            <Image src="images/MainPage.webp" alt="Dinivrey" w='1200px' h='760px'/>
          } />
          <Route path="/api/students" element={<StudentsPage />} />
          <Route path="/api/coaches" element={<CoachesPage />} />
          <Route path="/api/schedule" element={<SchedulePage />} />
          <Route path="/api/events" element={<EventsPage />} />
          <Route path="/api/statistics" element={<StatisticsPage />} />

          <Route path="/api/drills" element={<DrillsPage />} />
          <Route path="/api/metrics" element={<MetricsPage />} />
          <Route path="/api/achievements" element={<AchievementsPage />} />
        </Routes>
      </HStack>
    </Router>
  );
}

export default App;
