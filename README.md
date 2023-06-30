# Files difference calculator

## Hexlet tests and linter status:

[![Actions Status](https://github.com/elen-oz/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/elen-oz/frontend-project-46/actions)
[![linter&jest](https://github.com/elen-oz/frontend-project-46/actions/workflows/linter&jest.yml/badge.svg)](https://github.com/elen-oz/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/b9ef39d04bc8f5341ea4/maintainability)](https://codeclimate.com/github/elen-oz/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b9ef39d04bc8f5341ea4/test_coverage)](https://codeclimate.com/github/elen-oz/frontend-project-46/test_coverage)

## Project Description

Difference Calculator is a program designed to determine the difference between two data structures. It supports various file formats including .json and .yaml, and can handle both flat and nested structures.

## Features

- **Comparison of Flat Structures**: The program can compare flat .json and .yaml files with a plain structure.
- **Comparison of Nested Structures**: The program can compare .json files with a nested structure. It supports different output formats including STYLISH, PLAIN, and JSON.

## Installation

Before you start, make sure you have Node.js and npm installed on your machine.

1. Clone this repository to your local machine using `https://github.com/elen-oz/difference-calculator.git`
2. Navigate to the project directory: `cd difference-calculator`
3. Install all required dependencies with `npm install`

## Usage

To use the Difference Calculator, run the command `npm run diff-calc [file1] [file2]`. Replace `[file1]` and `[file2]` with the paths to the files you want to compare.

### Compare flat .json files with _plain_ structure (example of the 3rd step):

[![asciicast](https://asciinema.org/a/J8cwMLH4ZAqlcgBl8iuj4KTu2.svg)](https://asciinema.org/a/J8cwMLH4ZAqlcgBl8iuj4KTu2)

### Compare flat .yaml files with _plain_ structure (example of the 5th step):

[![asciicast](https://asciinema.org/a/7tedpbPc53ce9LI2hAfnwTVtw.svg)](https://asciinema.org/a/7tedpbPc53ce9LI2hAfnwTVtw)

### Compare .json files with _nested_ structure and with default STYLYSH format (example of the 6th step):

[![asciicast](https://asciinema.org/a/7LGo78sWJ3SbUNhIbRKUhFTHa.svg)](https://asciinema.org/a/7LGo78sWJ3SbUNhIbRKUhFTHa)

### Compare files with _nested_ structure and with PLAIN format (example of the 7th step):

[![asciicast](https://asciinema.org/a/MOBzQvErcrSbFSsEJUg6atBXS.svg)](https://asciinema.org/a/MOBzQvErcrSbFSsEJUg6atBXS)

### Compare files with _nested_ structure and with JSON format (example of the 8th step):

[![asciicast](https://asciinema.org/a/jvo4rAGQspApEl8I2ULZrYY2J.svg)](https://asciinema.org/a/jvo4rAGQspApEl8I2ULZrYY2J)
