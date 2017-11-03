    <?
    public function render($request, Exception $e){ 
        //print_r($e);exit();.
        
        if($e instanceof NotFoundHttpException){
             return response()->view('layout.missing', [], 404);
        }
        else  if($e instanceof QueryException){
             return $e;
        }else{
            $log=DB::table('error_log')->insert(['message'=>$e->getMessage(), 'file'=>$e->getFile(), 'line_no'=>$e->getLine(),'code'=>$e->getCode(), 'created_at'=>date("Y-m-d H:i:s")]);
            return $e;
        }
        return parent::render($request, $e);


        if ($this->isHttpException($e)) {
                     //return $this->renderHttpExceptionView($e);
                   return \Response::view('layout.missing',array(),404);
                }

                if (config('app.debug')) {
                   // return $this->renderExceptionWithWhoops($e);
                     return \Response::view('went-wrong',array(),500);  
                }


        }