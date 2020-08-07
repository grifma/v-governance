pragma solidity ^0.4.24;

//is

//    FusedController
contract VICoin {
  // using SafeMath for uint;
  // using SafeMath for int;

  // 1. Limited lifetime (decayed tokens)

  uint256 public lifetime;
  // number of blocks until balance decays to zero
  mapping(address => uint256) public lastTransactionBlock;
  // last incoming transaction
  mapping(address => uint256) public lastGenerationBlock;
  // last generation received
  mapping(address => uint256) public zeroBlock;
  // current 0 balance block

  // 2. Generation (new tokens)

  mapping(address => bool) public accountApproved;
  // is the account approved to receive generation
  uint256 public generationPeriod;
  // blocks between each generation period
  uint256 public generationAmount;
  // tokens issued to each account at each generation period
  uint256 public initialBalance;
  // starting balance for a new account

  // 3. Fees and contribution
  uint256 public communityContribution;
  // contribution % taken from the transaction fee on every transfer
  uint256 public transactionFee;
  // transaction fee % taken from every transfer
  address public communityContributionAccount;
  // account that receives the contribution payments

  // Constants
  uint256 public constant multiplier = 10**2;
  // accuracy for floating point multiplication
  uint256 public constant contributionFeeDecimals = 2;
  // number of decimal places for contribution and fee %

  // Testing
  uint256 public blocksMined;
  // blocks mined manually (for testing)

  // Events:
  event IncomeReceived(address indexed _account, uint256 _income);
  event Decay(address indexed _account, uint256 _decay);
  event Mint(address indexed to, uint256 value);
  event VerifyAccount(address indexed _account);
  event Burn(address indexed to, uint256 value);
  event PaidContribution(address indexed to, uint256 value);
  event BurnedFees(address indexed to, uint256 value);
  event ApproveAccount(address indexed _account);
  event UnapproveAccount(address _account);
  event UpdateLifetime(uint256 _lifetime);
  event UpdateInitialBalance(uint256 _initialBalance);
  event UpdateGenerationAmount(uint256 _generationAmount);
  event UpdateGenerationPeriod(uint256 _generationPeriod);
  event UpdateCommunityContributionAccount(
    address _newCommunityContributionAccount
  );
  event UpdateTransactionFee(uint256 _transactionFee);
  event UpdateCommunityContribution(uint256 _communityContribution);
  event Mined(uint256 _block);
  event Log(string _name, uint256 _value);

  constructor() public // string memory _name,
  // string memory _symbol,
  // uint8 _decimals,
  // uint _lifetime,
  // uint _generationAmount,
  // uint _generationPeriod,
  // uint _communityContribution,
  // uint _transactionFee,
  // uint _initialBalance,
  // address _communityContributionAccount,
  // address _controller
  // ERC20Detailed(_name, _symbol, _decimals)
  // FusedController(_controller)
  {
    // lifetime = _lifetime;
    // generationAmount = _generationAmount;
    // generationPeriod = _generationPeriod;
    // communityContribution = convertPercentageOnToPercentageOff(_communityContribution);
    // transactionFee = _transactionFee;
    // initialBalance = _initialBalance;
    // communityContributionAccount = _communityContributionAccount;
    // if (communityContributionAccount == address(0)) communityContributionAccount = msg.sender;

    communityContribution = 1250;
  }

  function() external payable {
    require(false, "Do not send money to the contract");
  }

  /// @notice Set the contribution percentage, to be taken from the fee %
  function updateCommunityContribution(uint256 _communityContribution)
    external
  //onlyController
  //fused(1)
  {
    communityContribution = _communityContribution;
    emit UpdateCommunityContribution(_communityContribution);
  }

  /** @notice Create a new account with the specified role
        @dev New accounts can always be created.
            This function can't be disabled. */
  function verifyAccount(address _account) external onlyController {
    accountApproved[_account] = true;
    lastGenerationBlock[_account] = block.number;
    lastTransactionBlock[_account] = block.number;
    emit VerifyAccount(_account);
  }

  modifier onlyController() {
    //stubbed out
    // require(true, "");
    _;
  }
}
