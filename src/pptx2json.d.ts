declare module 'pptx2json' {
    interface Slide {
      text: string;
    }
  
    interface Pptx2JsonResult {
      slides: Slide[];
    }
  
    function pptx2json(data: ArrayBuffer): Promise<Pptx2JsonResult>;
  
    export = pptx2json;
  }