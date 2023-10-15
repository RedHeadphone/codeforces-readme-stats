# Codeforces Readme Stats

An API that generates beautiful statistics of your Codeforces profile as an SVG image, perfect for showcasing your competitive programming skills and achievements on Github.

Check the [docs](https://redheadphone.github.io/codeforces-readme-stats/) for information on how to use the API.

## Features

- 📈 Clean and simple Codeforces stats
- 🎨 Multiple themes - [Theme](docs/themes.md)
- ⚙️ Fully customizable - [Customization](docs/customization.md)
- 🚫 No tracking, controllable cache
- 🍀 Open source - [MIT License](https://github.com/RedHeadphone/codeforces-readme-stats/blob/master/LICENSE)

Want to contribute? Feel free to open a pull request!

## Usage

### Codeforces stats card

Simply copy the code below, paste it into your `README.md`, and change the username query parameter to your Codeforces username (case-insensitive).

```md
![Codeforces Stats](https://codeforces-readme-stats.vercel.app/api/card?username=redheadphone)
```

Preview:

<p align="center">
  <img alt="Codeforces Stats" src="./docs/images/static/card.svg" />
</p>

Congratulation! You are now showing your Codeforces stats on your profile!

Want a hyperlink? Try this:

```md
[![Codeforces Stats](https://codeforces-readme-stats.vercel.app/api/card?username=redheadphone)](https://codeforces.com/profile/redheadphone)
```

### Codeforces rating badge

Rating badge can also be added to your `README.md`, by coping and pasting the code below 

```md
![Codeforces Badge](https://codeforces-readme-stats.vercel.app/api/badge?username=redheadphone)
```

Preview:

<p align="center">
  <img alt="Codeforces Badge" style="height:30px" src="./docs/images/static/badge.svg" />
</p>

## Contributing

Please kindly follow [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

## Acknowledgements

### Inspirations

- [sudiptob2/cf-stats](https://github.com/sudiptob2/cf-stats): SVG design
- [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats): API design and themes
- [JacobLinCool/LeetCode-Stats-Card](https://github.com/JacobLinCool/LeetCode-Stats-Card): Miscellaneous