
# `@etm12/etomusume`

A CLI tool to save chat logs from Twitch VODs.

## Contents

  - [Installation](#installation)
  - [Usage](#usage)
    - [Option 1 - command-line option](#option-1)
    - [Option 2 - put it in your env](#option-2)
  - [Why etomusume](#why-etomusume)

## Installation

```sh
npm install -g @etm12/etomusume
```

## Usage

By default, comments are printed to stdout, so you can pipe them whereever you need them to. Comments are printed as separate objects instead of a big list of comments.

Using this tool requires you to create a Twitch application to get an application client ID. You can create an application [from here](https://dev.twitch.tv/console/apps/create) or by going to [dev.twitch.tv](https://dev.twitch.tv).

After you get a Twitch client ID, there are two ways how you use it with this tool.

### <a name="option-1"></a>Option 1 - command-line option

```sh
etomusume --twitch-client-id <client id> --video-id <video id>
```

This can get tedious and annoying, so the recommended way is to look at option #2.

### <a name="option-2"></a>Option 2 - put it in your env

Add it to your shell of choice's `rc` file (`.bashrc`, `.zshrc`), prefixed with `ETOMUSUME`;

```sh
export ETOMUSUME_TWITCH_CLIENT_ID=<client id>
```

After this you can skip `--twitch-client-id` when running the tool;

```sh
etomusume --video-id <video id>
```

## Why _etomusume_

えと娘 is life. えと娘 is love.
