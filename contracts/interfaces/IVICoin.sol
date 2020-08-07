pragma solidity ^0.4.24;

/// This interface contains the functions to be called via the Aragon gateway

interface IVICoin {
  function name() external;

  function totalSupply() external returns (uint256);

  function balanceOf(address _account) external returns (uint256);

  function liveBalanceOf(address _account) external returns (uint256);

  function triggerOnchainBalanceUpdate(address _account)
    external
    returns (uint256);

  function approveAccount(address _account) external;

  function unapproveAccount(address _account) external;

  function verifyAccount(address _account) external;

  function updateLifetime(uint256 _lifetime) external;

  function updateInitialBalance(uint256 _initialBalance) external;

  function updateGenerationPeriod(uint256 _generationPeriod) external;

  function changeController(address _controller) external;

  function updateGenerationAmount(uint256 _generationAmount) external;

  function blowFuse(uint256 _fuseID, bool _confirm) external;

  function blowAllFuses(bool _confirm) external;

  function changeCommunityContributionAccount(
    address _newCommunityContributionAccount
  ) external;

  function updateCommunityContribution(uint256 _communityContribution) external;

  function updateTransactionFee(uint256 _transactionFee) external;

  function terminateCurrency(bool _confirm, address _recoverFunds) external;
}
