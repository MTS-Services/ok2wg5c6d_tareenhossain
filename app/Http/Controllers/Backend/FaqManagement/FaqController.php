<?php

namespace App\Http\Controllers\Backend\FaqManagement;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = $request->get('per_page', 10);
        $faqs = Faq::orderBy('id')->paginate($perPage, ['id', 'question', 'answer']);
        
        return Inertia::render('backend/faq/index', [
            'faqs' => $faqs,
        ]);
    }
    
    public function create()
    {
        return Inertia::render('backend/faq/create');
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        Faq::create($validated);

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ created successfully!');
    }

    public function edit($id)
    {
        $faq = Faq::findOrFail($id);
        
        return Inertia::render('backend/faq/edit', [
            'faq' => $faq,
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);
        
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $faq->update($validated);

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ updated successfully!');
    }
    
    public function delete($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();
        
        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ deleted successfully!');
    }
}

