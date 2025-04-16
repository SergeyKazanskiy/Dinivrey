import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './api/api';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HStack, VStack, Text, Image } from '@chakra-ui/react';
import { SideMenuCell } from './components/SideMenuCell';
import { sidebarStyles } from './shared/appStyles';
import { StudentsPage, CoachesPage, ManagersPage, EventsPage } from './pages/index';
import { StatisticsPage, TestsPage, GamesPage, AchievementsPage } from './pages/index';
import RedocPage from './pages/redoc'


function App() {
  const [config, setConfig] = useState<string>(''); // get prodaction url from server

 // useEffect(() => {
 //   axios.get(`${API_BASE_URL}/config`)
 //     .then((res) => setConfig(res.data.base_url))
 //     .catch((err) => console.error(err));
 // }, []);

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
          <SideMenuCell img='Manager.png' title='Managers' to='/api/managers'/>
          <SideMenuCell img='Event.png' title='Events' to='/api/events'/>
          <SideMenuCell img='Statistics.png' title='Statistics' to='/api/statistics'/>

          <Text style={sidebarStyles.group} alignSelf='start' pl={4} pt={8} pb={3} >Settings</Text>
          <SideMenuCell img='Test.png' title='Tests' to='/api/tests'/>
          <SideMenuCell img='Game.png' title='Games' to='/api/games'/>
          <SideMenuCell img='Achievement.png' title='Achievements' to='/api/achievements'/>
        </VStack>
        <Routes>
          <Route path="/" element={
            <Image src="images/MainPage.webp" alt="Dinivrey" w='1200px' h='760px'/>
          } />
          <Route path="/api/students" element={<StudentsPage />} />
          <Route path="/api/coaches" element={<CoachesPage />} />
          <Route path="/api/managers" element={<ManagersPage />} />
          <Route path="/api/events" element={<EventsPage />} />
          <Route path="/api/statistics" element={<StatisticsPage />} />

          <Route path="/api/tests" element={<TestsPage />} />
          <Route path="/api/games" element={<GamesPage />} />
          <Route path="/api/achievements" element={<AchievementsPage />} />
        </Routes>
      </HStack>
    </Router>
  );
}

export default App;
