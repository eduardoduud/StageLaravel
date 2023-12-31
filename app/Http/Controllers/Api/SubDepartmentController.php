<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubDepartmentRequest;
use App\Http\Requests\UpdateSubDepartmentRequest;
use App\Http\Resources\SubDepartmentResource;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\WorkflowResource;
use App\Models\SubDepartment;
use App\Models\Workflow;

class SubDepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return SubDepartmentResource::collection(SubDepartment::query()->orderBy('id', 'desc')->paginate(20));
    }

    public function store(StoreSubDepartmentRequest $request)
    {
        // Validação e criação do novo workflow
        $data = $request->validated();
        
        $subdepartment = new SubDepartment();
        $subdepartment->name = $data['name'];
        $subdepartment->department_id = $data['department_id'];
        $subdepartment->save();
        
        // Retorne o setor criado
        return response()->json(['message' => 'Sub-setor criado com sucesso', 'setor' => $subdepartment], 201);
    }

    public function show($id)
    {
        $subdepartment = Subdepartment::findOrFail($id);
    
        $workflows = Workflow::where('sub_id', $subdepartment->id)
            ->get();
    
        return response()->json([
            'workflows' => WorkflowResource::collection($workflows),
        ]);
    }

    public function update(UpdateSubDepartmentRequest $request, SubDepartment $subdepartment)
    {
        $data = $request->validated();
        $subdepartment->update($data);

        return new SubDepartmentResource($subdepartment);
    }

    public function destroy(SubDepartment $subdepartment)
    {
        $subdepartment->delete();

        return response("", 204);
    }
}