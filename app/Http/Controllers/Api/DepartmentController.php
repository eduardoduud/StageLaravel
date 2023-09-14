<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\WorkflowResource;
use App\Http\Resources\SubDepartmentResource;
use App\Models\Workflow;
use App\Models\Subdepartment;
use App\Models\Department;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return DepartmentResource::collection(Department::query()->orderBy('id', 'desc')->paginate(20));
    }

    public function store(StoreDepartmentRequest $request)
    {
        // Validação e criação do novo workflow
        $data = $request->validated();
        
        $department = new Department();
        $department->name = $data['name'];
        $department->save();

        // Retorne o setor criado
        return response()->json(['message' => 'Setor criado com sucesso', 'setor' => $department], 201);
    }

    public function show($id)
    {
        $department = Department::findOrFail($id);
    
        $workflows = Workflow::where('department_id', $department->id)
            ->whereNull('sub_id')
            ->get();
    
        $subdepartments = Subdepartment::where('department_id', $department->id)
            ->get();
    
        return response()->json([
            'department' => new DepartmentResource($department),
            'workflows' => WorkflowResource::collection($workflows),
            'subdepartments' => SubdepartmentResource::collection($subdepartments),
        ]);
    }

    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        $data = $request->validated();
        $department->update($data);

        return new DepartmentResource($department);
    }

    public function destroy(Department $department)
    {
        $department->delete();

        return response("", 204);
    }
}