import {deploy, recover} from "../lib/functions";


async function main() {
    await deploy();
    await recover();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
