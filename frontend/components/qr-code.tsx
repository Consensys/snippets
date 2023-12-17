"use client";

import React from "react";
import QRCode from "qrcode.react";

const CodeBlock = ({ link }: { link: string }) => <QRCode value={link} />;

export default CodeBlock;
