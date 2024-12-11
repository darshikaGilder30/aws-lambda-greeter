#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { InfrastructureStack } from "../lib/infrastructre-stack";

const app = new cdk.App();
new InfrastructureStack(app, "InfrastructureStack", {});
