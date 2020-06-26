import Commander from 'commander'

async function main() {
    Commander.version('v1')
        .parse(process.argv)
}

main()