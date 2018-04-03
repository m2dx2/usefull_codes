<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use DB;
class TestController extends CallApiController{
	public function test(){
		print "<pre>";
		$params = ['2014-01-01','2014-12-31',100];
		$results = $this::CallRaw('test');
		print_r($results);
	}
	public static function CallRaw($procName, $parameters = null, $isExecute = false)
{
    $syntax = '';
    for ($i = 0; $i < count($parameters); $i++) {
        $syntax .= (!empty($syntax) ? ',' : '') . '?';
    }
    $syntax = 'CALL ' . $procName . '(' . $syntax . ');';

    $pdo = DB::connection()->getPdo();
    $pdo->setAttribute(\PDO::ATTR_EMULATE_PREPARES, true);
    $stmt = $pdo->prepare($syntax,[\PDO::ATTR_CURSOR=>\PDO::CURSOR_SCROLL]);
    for ($i = 0; $i < count($parameters); $i++) {
        $stmt->bindValue((1 + $i), $parameters[$i]);
    }
    $exec = $stmt->execute();
    if (!$exec) return $pdo->errorInfo();
    if ($isExecute) return $exec;

    $results = [];
    do {
        try {
            $results[] = $stmt->fetchAll(\PDO::FETCH_OBJ);
        } catch (\Exception $ex) {

        }
    } while ($stmt->nextRowset());

    if (1 === count($results)) return $results[0];
    return $results;
}
}
