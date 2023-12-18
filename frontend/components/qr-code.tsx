"use client";

import React from "react";
import QRCode from "qrcode.react";

const QRCodeContainer = ({ link }: { link: string }) => <QRCode size={52} value={link} />;

export default QRCodeContainer;
