declare module 'react-qr-reader' {
  import * as React from 'react';

  export interface QrReaderProps {
    facingMode?: string;
    delay?: number;
    onScan?: (data: string | null) => void;
    onError?: (error: any) => void;
    style?: React.CSSProperties;
  }

  export class QrReader extends React.Component<QrReaderProps, any> {}
}
