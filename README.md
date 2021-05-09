# Install

Clone the git repository:

    git clone https://github.com/sergeyshestak/Caesar-cipher-CLI-tool.git

Go into the repository:

    cd caesar-cipher-cli-tool

Go into the caesar-cipher-cli-tool branch:

      git checkout caesar-cipher-cli-tool

Use the package manager npm to install dependencies:

      npm install

# Arguments

| Argument | Shortcut | Description          | Required |
| -------- | -------- | -------------------- | -------- |
| --shift  | -s       | Alphabet shift       | Yes      |
| --action | -a       | Encode/decode action | Yes      |
| --input  | -i       | Path to input file   | No       |
| --output | -o       | Path to output file  | No       |

# How to use

Use bash to run application:

    node caesar_cipher -s 1 -a encode -i './input.txt' -o './output.txt'

If input not provided application will work with process.stdin. To finish working with the application use CTRL + C command.

# Usage example:

```bash
$ node caesar_cipher -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ node caesar_cipher --action encode --shift 7 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ node caesar_cipher --action decode --shift 7 --input encoded.txt --output plain.txt
```

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> plain.txt
> `This is secret. Message about "_" symbol!`

```bash
$ node caesar_cipher --action encode --shift -1 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!`
