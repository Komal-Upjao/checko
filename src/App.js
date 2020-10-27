import './App.css';
import StepProgressBar from './components/StepProgressBar';
import logo from './assets/logo.jpg'
function App() {
  return (
    <div className="App">
      <div className="header">
        <img src={logo} />
      </div>
      <div className="body">
        <StepProgressBar />
      </div>
      <div className="footer">
        <a href='https://play.google.com/store/apps/details?id=com.transpacks.Checko1&hl=en_IN&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' /></a>
      </div>
    </div>
  );
}

export default App;
