import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

type GOptions = Parameters<SSTConfig["config"]>[0];

export default {
  config(_input: GOptions) {
    const name = "sharp-bug";

    return {
      name,
      region: "eu-central-1",
      advanced: {
        disableAppModeCheck: true,
      },
      bootstrap: {
        useCdkBucket: true,
      },
    };
  },

  stacks(stackApp) {
    stackApp.stack(function Site({ stack, app }) {
      const site = new NextjsSite(stack, "site", {
        runtime: "nodejs18.x",
        waitForInvalidation: false,
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
