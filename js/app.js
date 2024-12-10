const depositPage = document.getElementById('deposit-page');
const depositForm = document.getElementById('deposit-form');
const miningDashboard = document.getElementById('mining-dashboard');
const depositSummary = document.getElementById('deposit-summary');
const miningStatus = document.getElementById('mining-status');
const rewardDisplay = document.getElementById('reward');
const progressBar = document.getElementById('progress-bar');
const progressPercentage = document.getElementById('progress-percentage');
const stopButton = document.getElementById('stop-button');
const startMiningBtn = document.getElementById('start-mining-btn');

let miningInterval;
let depositAmount = 0;
let hashRate = 0; // Hash rate increases based on deposit
let reward = 0;
let dailyRate = 0.0001; // Default earning rate for users without a deposit
let progress = 0; // Progress percentage (0 to 100)
let progressPerSecond = 0; // How much progress should be made per second to finish in 24 hours

// Display deposit page when the "Start Mining" button is clicked
startMiningBtn.addEventListener('click', () => {
  depositPage.classList.remove('hidden');
  startMiningBtn.classList.add('hidden');
});

// Handle Deposit Submission
depositForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const usdtAddress = document.getElementById('usdt-address').value;
  depositAmount = parseFloat(document.getElementById('deposit-amount').value);

  if (depositAmount < 10) {
    alert('Minimum deposit is 10 USDT.');
    return;
  }

  // Calculate hash rate and earnings in USDT
  hashRate = depositAmount * 10; // 10 H/s per USDT
  dailyRate = depositAmount * 0.06; // 6% daily earnings in USDT

  // Calculate how much progress should be made per second to finish in 24 hours
  progressPerSecond = 100 / (24 * 60 * 60); // 1% progress every 24 hours (86400 seconds)

  // Show mining dashboard with calculated values
  depositPage.classList.add('hidden');
  miningDashboard.classList.remove('hidden');
  depositSummary.textContent = `Deposit: ${depositAmount} USDT | Rate: ${hashRate} H/s`;

  // Start mining simulation
  startMining(dailyRate);
});

// Start Mining Simulation
function startMining(dailyRate) {
  miningStatus.textContent = `Hash Rate: ${hashRate} H/s`;

  miningInterval = setInterval(() => {
    // Update reward and progress
    reward += (dailyRate / 86400); // Earnings per second (daily rate divided by seconds in a day)
    rewardDisplay.textContent = `Earnings: ${reward.toFixed(8)} USDT`;

    // Update progress bar (simulate mining over 24 hours)
    if (progress < 100) {
      progress += progressPerSecond;
      progressBar.value = progress;
      progressPercentage.textContent = `${Math.min(progress.toFixed(2), 100)}%`;
    }

  }, 1000);
}

// Stop Mining
stopButton.addEventListener('click', () => {
  clearInterval(miningInterval);
  alert(`Mining Stopped! Total Earnings: ${reward.toFixed(8)} USDT`);
});

// Start with the default rate for users without a deposit
document.addEventListener('DOMContentLoaded', () => {
  rewardDisplay.textContent = `Earnings: ${reward.toFixed(8)} USDT`;
  setInterval(() => {
    // Update the reward for users without deposit (constant default rate)
    reward += (dailyRate / 86400);
    rewardDisplay.textContent = `Earnings: ${reward.toFixed(8)} USDT`;
  }, 1000);
});
