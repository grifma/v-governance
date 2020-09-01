pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";
import "./interfaces/IVICoinAdjustable.sol";
import "@nomiclabs/buidler/console.sol";

contract VCommunityApp is AragonApp {
    using SafeMath for uint256;

    /// Events
    event SetVICoinAddress(address _viCoinAddress);
    event UnapproveAccount(address _account);
    event VerifyAccount(address _account);
    event Updatelifetime(uint256 _lifetime);
    event UpdateInitialBalance(uint256 _initialBalance);
    event UpdateGenerationPeriod(uint256 _generationPeriod);
    event UpdateController(address _controller);
    event UpdateGenerationAmount(uint256 _generationAmount);
    event BlowFuse(uint256 _fuseID, bool _confirm);
    event BlowAllFuses(bool _confirm);
    event ChangeCommunityContributionAccount(
        address _newCommunityContributionAccount
    );
    event UpdateCommunityContribution(uint256 _communityContribution);
    event UpdateTransactionFee(uint256 _transactionFee);

    /// State
    IVICoinAdjustable public viCoin;
    string public name;

    /// ACL
    bytes32 public constant SETCOINADDRESS = keccak256("SETCOINADDRESS");
    bytes32 public constant UNAPPROVEACCOUNT = keccak256("UNAPPROVEACCOUNT");
    bytes32 public constant VERIFYACCOUNT = keccak256("VERIFYACCOUNT");
    bytes32 public constant UPDATELIFETIME = keccak256("UPDATELIFETIME");
    bytes32 public constant UPDATEINITIALBALANCE = keccak256(
        "UPDATEINITIALBALANCE"
    );
    bytes32 public constant UPDATEGENERATIONPERIOD = keccak256(
        "UPDATEGENERATIONPERIOD"
    );
    bytes32 public constant UPDATECONTROLLER = keccak256("UPDATECONTROLLER");
    bytes32 public constant UPDATEGENERATIONAMOUNT = keccak256(
        "UPDATEGENERATIONAMOUNT"
    );
    bytes32 public constant BLOWFUSE = keccak256("BLOWFUSE");
    bytes32 public constant UPDATECOMMUNITYCONTRIBUTIONACCOUNT = keccak256(
        "UPDATECOMMUNITYCONTRIBUTIONACCOUNT"
    );
    bytes32 public constant UPDATECOMMUNITYCONTRIBUTION = keccak256(
        "UPDATECOMMUNITYCONTRIBUTION"
    );
    bytes32 public constant UPDATETRANSACTIONFEE = keccak256(
        "UPDATETRANSACTIONFEE"
    );
    bytes32 public constant UPDATENAME = keccak256("UPDATENAME");
    bytes32 public constant UPDATESYMBOL = keccak256("UPDATESYMBOL");
    bytes32 public constant TERMINATE = keccak256("TERMINATE");

    function initialize(address _viCoinAddress, string memory _name)
        public
        onlyInit
    {
        if (_viCoinAddress != address(0)) {
            viCoin = IVICoinAdjustable(_viCoinAddress);
        }
        name = _name;
        initialized();
    }

    /**
     * @notice Set the address of the Value Instrument currency governed by this DAO to `_viCoinAddress`
     *
     */
    function setVICoinAddress(address _viCoinAddress)
        external
        auth(SETCOINADDRESS)
    {
        viCoin = IVICoinAdjustable(_viCoinAddress);
        emit SetVICoinAddress(_viCoinAddress);
    }

    /**
     * @notice Unapprove account `_account` so that it no logner receives basic income
     *
     */
    function unapproveAccount(address _account)
        external
        auth(UNAPPROVEACCOUNT)
    {
        viCoin.unapproveAccount(_account);
        emit UnapproveAccount(_account);
    }

    /**
     * @notice Verify account `_account` for the first time, so that it receives an initial balance and basic income
     *
     */
    function verifyAccount(address _account) external auth(VERIFYACCOUNT) {
        console.log("About to verify account");
        viCoin.verifyAccount(_account);
        emit VerifyAccount(_account);
    }

    function updateLifetime(uint256 _lifetime) external auth(UPDATELIFETIME) {
        viCoin.updateLifetime(_lifetime);
        emit Updatelifetime(_lifetime);
    }

    function updateInitialBalance(uint256 _initialBalance)
        external
        auth(UPDATEINITIALBALANCE)
    {
        viCoin.updateInitialBalance(_initialBalance);
        emit UpdateInitialBalance(_initialBalance);
    }

    function updateGenerationPeriod(uint256 _generationPeriod)
        external
        auth(UPDATEGENERATIONPERIOD)
    {
        viCoin.updateGenerationPeriod(_generationPeriod);
        emit UpdateGenerationPeriod(_generationPeriod);
    }

    function updateGenerationAmount(uint256 _generationAmount)
        external
        auth(UPDATEGENERATIONAMOUNT)
    {
        viCoin.updateGenerationAmount(_generationAmount);
        emit UpdateGenerationAmount(_generationAmount);
    }

    /**
     * @notice Change the controller address of the currency to `controller`
     *
     */
    function updateController(address _controller)
        external
        auth(UPDATECONTROLLER)
    {
        viCoin.updateController(_controller);
        emit UpdateController(_controller);
    }

    function blowFuse(uint256 _fuseID, bool _confirm) external auth(BLOWFUSE) {
        viCoin.blowFuse(_fuseID, _confirm);
        emit BlowFuse(_fuseID, _confirm);
    }

    function blowAllFuses(bool _confirm) external auth(BLOWFUSE) {
        viCoin.blowAllFuses(_confirm);
        emit BlowAllFuses(_confirm);
    }

    function updateCommunityContributionAccount(
        address _newCommunityContributionAccount
    ) external auth(UPDATECOMMUNITYCONTRIBUTIONACCOUNT) {
        viCoin.updateCommunityContributionAccount(
            _newCommunityContributionAccount
        );
        emit ChangeCommunityContributionAccount(
            _newCommunityContributionAccount
        );
    }

    function updateCommunityContribution(uint256 _communityContribution)
        external
        auth(UPDATECOMMUNITYCONTRIBUTION)
    {
        viCoin.updateCommunityContribution(_communityContribution);
        emit UpdateCommunityContribution(_communityContribution);
    }

    function updateTransactionFee(uint256 _transactionFee)
        external
        auth(UPDATETRANSACTIONFEE)
    {
        viCoin.updateTransactionFee(_transactionFee);
        emit UpdateTransactionFee(_transactionFee);
    }

    function updateName(string _name) external auth(UPDATENAME) {
        viCoin.updateName(_name);
    }

    function updateSymbol(string _symbol) external auth(UPDATESYMBOL) {
        viCoin.updateSymbol(_symbol);
    }

    function totalSupply() external returns (uint256) {
        return viCoin.totalSupply();
    }

    function liveBalanceOf(address _account) external returns (uint256) {
        return viCoin.liveBalanceOf(_account);
    }

    function balanceOf(address _account) external returns (uint256) {
        return viCoin.balanceOf(_account);
    }

    function triggerOnchainBalanceUpdate(address _account)
        external
        returns (uint256)
    {
        return viCoin.triggerOnchainBalanceUpdate(_account);
    }

    // function terminateCurrency(bool _confirm, address _recoverFunds)
    //     external
    //     auth(TERMINATE)
    // {
    //     viCoin.terminateCurrency(_confirm, _recoverFunds);
    // }

    function terminateAragonApp(bool _confirm, address _recoverFunds)
        external
        auth(TERMINATE)
    {
        require(
            _confirm == true,
            "Please confirm you want to destroy this contract"
        );
        selfdestruct(_recoverFunds);
    }

    function getTransactionFee() external returns (uint256) {
        return viCoin.getTransactionFee();
    }

    function getCommunityContribution() external returns (uint256) {
        return viCoin.getCommunityContribution();
    }
}
