#!/usr/bin/env node

const program = require('commander');
const { run, open } = require('./launcher');
const { version } = require('./package.json');

if (
  !process.env.SECRET_WORDS &&
  !process.env.PRIVATE_KEY &&
  !process.env.SKIP_METAMASK_SETUP &&
  !process.env.SKIP_METAMASK_INSTALL
) {
  throw new Error(
    'Please provide SECRET_WORDS or PRIVATE_KEY environment variable',
  );
}

if (process.env.RPC_URL || process.env.CHAIN_ID) {
  if (!process.env.RPC_URL) {
    throw new Error('Please provide RPC_URL environment variable');
  } else if (!process.env.CHAIN_ID) {
    throw new Error('Please provide CHAIN_ID environment variable');
  }

  if (
    !process.env.RPC_URL.startsWith('http://') && //DevSkim: ignore DS137138
    !process.env.RPC_URL.startsWith('https://')
  ) {
    throw new Error(
      'RPC_URL environment variable should start with "http://" or "https://"', //DevSkim: ignore DS137138
    );
  }

  if (process.env.BLOCK_EXPLORER) {
    if (
      !process.env.BLOCK_EXPLORER.startsWith('http://') && //DevSkim: ignore DS137138
      !process.env.BLOCK_EXPLORER.startsWith('https://')
    ) {
      throw new Error(
        'BLOCK_EXPLORER environment variable should start with "http://" or "https://"', //DevSkim: ignore DS137138
      );
    }
  }
}

program.version(version, '-v, --version');