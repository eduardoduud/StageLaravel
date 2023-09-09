<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWorkflowRequest;
use App\Http\Requests\UpdateWorkflowRequest;
use App\Http\Resources\WorkflowResource;
use App\Models\Workflow;
use App\Models\Department;

class WorkflowController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return WorkflowResource::collection(Workflow::query()->orderBy('id', 'desc')->paginate(20));
    }

    public function store(StoreWorkflowRequest $request)
    {
        // Validação e criação do novo workflow
        $data = $request->validated();

        // Recuperando o Setor com base no ID passado no request
        $department = Department::findOrFail($data['department_id']);

        // Criando um novo Workflow associado ao Setor
        $workflow = new Workflow();
        $workflow->name = $data['name'];
        $workflow->description = $data['description'];
        $workflow->htmltext = $data['htmltext'];

        // Associando o Workflow ao Setor
        $department->children()->save($workflow);

        $workflow->save();

        return response()->json(['message' => 'Workflow criado com sucesso', 'workflow' => $workflow], 201);
    }

    public function show(Workflow $workflow)
    {
        return new WorkflowResource($workflow);
    }

    public function update(UpdateWorkflowRequest $request, Workflow $workflow)
    {
        $data = $request->validated();
        $workflow->update($data);

        return new WorkflowResource($workflow);
    }

    public function destroy(Workflow $workflow)
    {
        $workflow->delete();

        return response("", 204);
    }
}